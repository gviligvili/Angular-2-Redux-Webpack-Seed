/**
 * Created by talgvili on 22/12/2016.
 */

import { Schema, arrayOf } from 'normalizr';
import { userSchema } from './user.schema'
const articleSchema = new Schema("article");
const arrayOfArticlesSchema = arrayOf(articleSchema)

articleSchema.define({
    author: userSchema,
    contributors: arrayOf(userSchema)
});



export { articleSchema , arrayOfArticlesSchema}