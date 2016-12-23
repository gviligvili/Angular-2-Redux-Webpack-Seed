/**
 * Created by talgvili on 22/12/2016.
 */

import { Schema, arrayOf } from 'normalizr';
import { userSchema } from './user.schema'
const articleSchema = Schema("article");

articleSchema.define({
    author: userSchema,
    contributors: arrayOf(userSchema)
});

export { articleSchema }