import { makeExecutableSchema } from "graphql-tools";
import {mergeTypeDefs, mergeResolvers} from '@graphql-tools/merge';

import {authorTypeDefs, authorResolvers} from './author.js';
import {bookTypeDefs, bookResolvers} from './book.js';
import {readerTypeDefs, readerResolvers} from './reader.js';
import {borrowingRecordTypeDefs, borrowingRecordResolvers} from './borrowingRecord.js';
import {fineTypeDefs, fineResolvers} from './fine.js';
import {genreTypeDefs, genreResolvers} from './genre.js';
import {inventoryTypeDefs, inventoryResolvers} from './inventory.js';

const typeDefs = mergeTypeDefs([
  authorTypeDefs, 
  bookTypeDefs, 
  readerTypeDefs, 
  borrowingRecordTypeDefs, 
  fineTypeDefs, 
  genreTypeDefs, 
  inventoryTypeDefs
]);

const resolvers = mergeResolvers([
  authorResolvers, 
  bookResolvers, 
  readerResolvers, 
  borrowingRecordResolvers, 
  fineResolvers, 
  genreResolvers, 
  inventoryResolvers
]);

const schema = makeExecutableSchema({typeDefs, resolvers});

export default schema;