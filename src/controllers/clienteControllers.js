import Cliente from '../config/bd.js';
import jwt from 'jsonwebtoken';
import { clientCreated } from "../services/publisherRabbit.js";

export const getAllClientes = async (req, res) => {
    try {
        const clientes = await Cliente.findAll({ where: { activo: true } });
        res.status(200).json(clientes);
    } catch (error) {
        console.error('Error al listar los clientes: ', error);
        res.status(500).json({ message: 'Error al obtener los clientes' });
    }
};

export const createCliente = async (req, res) => {
  console.log("Creando cliente...");
  const { nombre, apellidos, direccion, correo, telefono, fecha_nacimiento, password } = req.body;

  if (!nombre || !apellidos || !direccion || !correo || !telefono || !fecha_nacimiento || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }
  
  const existingCliente = await Cliente.findOne({ where: { correo }});
  if (existingCliente) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(correo)) {
      return res.status(400).json({ message: 'El formato del correo electrónico no es válido' });
  }
  
  if (telefono.length > 10) {
      return res.status(400).json({ message: 'El formato del teléfono excede el número de caracteres' });
  }
  
  try {
      const newCliente = await Cliente.create({ 
          nombre,
          apellidos,
          direccion,
          correo,
          telefono,
          fecha_nacimiento,
          password,
          
          activo: true,
          fechaCreacion: new Date()
      });

      const default_password = "def_pass";
      await clientCreated({
          id: newCliente.id,
          name: newCliente.nombre,
          lastName: newCliente.apellidos,
          email: newCliente.correo,
          phone: newCliente.telefono,
          password: default_password,
      });

      
    //  await clientCreatedEvent(newCliente);
      res.status(201).json({ message: 'Cliente creado correctamente', data: newCliente });
  } catch (error) {
      console.error('Error al crear el cliente: ', error);
      res.status(500).json({ message: 'Error al crear el cliente' });
  }
};


export const updateCliente = async (req, res) => {
    const { id } = req.params;
    const { telefono, direccion } = req.body;

    try {
        const cliente = await Cliente.findByPk(id);
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        
        if (telefono.length > 10) {
            return res.status(400).json({ message: 'El formato del teléfono excede el número de caracteres' });
        }
        
        await cliente.update({
            telefono: telefono || cliente.telefono,
            direccion: direccion || cliente.direccion
        });

        res.status(200).json({ message: 'Cliente actualizado', data: cliente });
    } catch (error) {
        console.error('Error al actualizar el cliente: ', error);
        res.status(500).json({ message: 'Error al actualizar el cliente' });
    }
};

export const deleteCliente = async (req, res) => {
    const { id } = req.params;
    try {
        const cliente = await Cliente.findByPk(id);
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        
        await cliente.update({ activo: false });
        res.status(200).json({ message: 'Cliente desactivado', data: cliente });
    } catch (error) {
        console.error('Error al eliminar el cliente: ', error);
        res.status(500).json({ message: 'Error al eliminar el cliente' });
    }
};

export const loginCliente = async (req, res) => {
    const { correo, password } = req.body;
    if (!correo || !password) {
        return res.status(400).json({ message: 'Correo y contraseña son obligatorios' });
    }

    try {
        const cliente = await Cliente.findOne({ where: { correo } });
        if (!cliente || cliente.password !== password) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }
        
        const SECRET_KEY = "aJksd9QzPl+sVdK7vYc/L4dK8HgQmPpQ5K9yApUsj3w=";
        const token = jwt.sign({ id: cliente.id, correo: cliente.correo }, SECRET_KEY, { expiresIn: "1h" });

        res.status(200).json({ message: 'Inicio de sesión exitoso', data: token });
    } catch (error) {
        console.error('Error :', error);
        return res.status(500).json({ message: 'Error al iniciar sesión' });
    }
}
