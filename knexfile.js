module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './games_data.db'
    },
    useNullAsDefault: true
  }
};
