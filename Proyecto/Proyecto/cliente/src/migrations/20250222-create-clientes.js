module.exports = {
    up: async ({ context }) => {
      await context.createTable('Clientes', {
        id: { type: 'INTEGER', autoIncrement: true, primaryKey: true },
        nombre: { type: 'STRING', allowNull: false },
        apellidos: { type: 'STRING', allowNull: false },
        direccion: { type: 'STRING', allowNull: false },
        correo: { type: 'STRING', allowNull: false, unique: true },
        telefono: { type: 'STRING', allowNull: false },
        fecha_nacimiento: { type: 'DATE', allowNull: false },
        createdAt: { type: 'DATE', allowNull: false },
        updatedAt: { type: 'DATE', allowNull: false }
      });
    },
    down: async ({ context }) => {
      await context.dropTable('Clientes');
    }
  };
  