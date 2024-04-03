import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        default: "https://lh3.googleusercontent.com/a/ACg8ocJ4GlOZhLITKM2AYhhGYe65-_BFH6ohp0XCrm6hIDO6=s96-c"
    }
},{
    timestamps: true
})


const User = mongoose.model('User', schema)


export default User