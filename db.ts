import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'desafioatividade',
  connectionLimit: 1
});

export default pool;
