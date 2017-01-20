/**
 * Created by talgvili on 22/12/2016.
 */

import { schema } from 'normalizr';
import { userSchema } from './user.schema'


// Define your article
const articleSchema = new schema.Entity('articles', {
    author: userSchema,
    contributors: [userSchema]
});

export { articleSchema }