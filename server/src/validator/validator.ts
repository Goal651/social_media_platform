import Joi from "joi";

const signUpDataSchema = Joi.object({
    names: Joi.string().required().messages({
        'string.empty': 'Names is required',
        'any.required': 'Names is required',
    }),
    email: Joi.string().email().required().messages({
        'string.empty': 'Email is required',
        'string.email': 'Email is invalid',
        'any.required': 'Email is required',
    }),
    password: Joi.string().min(6).required().messages({
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 6 characters',
        'any.required': 'Password is required',
    }),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'string.empty': 'Confirm Password is required',
        'any.required': 'Confirm Password is required',
        'any.only': 'Check your password',
    }),
})

const loginDataSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.empty': 'Email is required',
        'string.email': 'Email is invalid',
        'any.required': 'Email is required',
    }),
    password: Joi.string().required().messages({
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 6 characters',
        'any.required': 'Password is required',
    }),
})

const registerGroupDataSchema = Joi.object({
    groupName: Joi.string().required().messages({
        'string.empty': 'Name is required',
        'any.required': 'Name is required',
    }),
    image: Joi.string().strict().messages({
        'string.base': 'Image is invalid'
    }),
})

const postDataSchema = Joi.object({
    content: Joi.string().required().messages({
        'string.empty': 'Content is required',
        'any.required': 'Content is required',
    }),
    postType: Joi.string().required().messages({
        'string.empty': 'Post type is required',
        'any.required': 'Post type is required',
    }),
    file: Joi.string().strict().messages({
        'string.base': 'File is invalid'
    })
})

const statusDataSchema = Joi.object({
    content: Joi.string().required().messages({
        'string.empty': 'Content is required',
        'any.required': 'Content is required',
    }),
    statusType: Joi.string().required().messages({
        'string.empty': 'Post type is required',
        'any.required': 'Post type is required',
    }),
    statusFileUrls: Joi.array().items(Joi.string()).messages({
        'string.base': 'File is invalid'
    })
})

const notificationDataSchema = Joi.object({
    content: Joi.string().required().messages({
        'string.empty': 'Content is required',
        'any.required': 'Content is required',
    }),
    notificationType: Joi.string().required().messages({
        'string.empty': 'Notification type is required',
        'any.required': 'Notification type is required',
    }),
    from: Joi.string().required().messages({
        'string.empty': 'From is required',
        'any.required': 'From is required',
    }),
    to: Joi.string().required().messages({
        'string.empty': 'To is required',
        'any.required': 'To is required',
    }),
})

const fileDataSchema = Joi.object({
    fileChunk: Joi.string().strict().required().messages({
        'string.base': 'File is invalid',
        'any.required': 'File is required',
    }),
    fileName: Joi.string().required().messages({
        'string.empty': 'File name is required',
        'any.required': 'File name is required',
    }),

    fileSize: Joi.number().required().messages({
        'string.empty': 'File size is required',
        'any.required': 'File size is required',
    }),

    fileType: Joi.string().required().messages({
        'string.empty': 'File type is required',
        'any.required': 'File type is required',
    }),

    totalChunks: Joi.number().required().messages({
        'string.empty': 'Total chunks is required',
        'any.required': 'Total chunks is required',
    }),
    currentChunk: Joi.number().required().messages({
        'string.empty': 'Current chunk is required',
        'any.required': 'Current chunk is required',
    }),

})


export default {
    signUpDataSchema,
    loginDataSchema,
    registerGroupDataSchema,
    postDataSchema,
    statusDataSchema,
    notificationDataSchema,
    fileDataSchema
}