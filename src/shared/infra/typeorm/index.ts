// Arquivo que irá fazer a conexão com o BD
import { createConnections } from 'typeorm';

// se encontrar um ormconfig.json, importa automaticamente, lê os dados e faz a conexão com o BD
createConnections();
