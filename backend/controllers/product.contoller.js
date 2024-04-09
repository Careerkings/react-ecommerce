import Product from "../models/product.model.js"
import cloudinary from "../utils/cloudinary.js"


export const createProductRouter = async (req, res, next) => {
   
    res.send('my wife')
    const { name, desc, brand, price, image } = req.body
    try{
        if(image){
            const uploadImage = await cloudinary.uploader.upload(image, 
                {upload_presets: "studentKonect"})

                if(uploadImage){
                    const newProduct = new Product({
                        name,
                        brand,
                        desc,
                        price,
                        image: uploadImage
                    })
                    const savedProduct = await newProduct.save()
                    res.status(200).json(savedProduct)
                    console.log(savedProduct)
                }
        }

    }catch(err){
        next(err)
        console.log(err)
    }
}


export const getProductRouter = async (req, res, next) => {
    try { 
        const products = await Product.find();
        res.status(201).json(products)
    }catch(err) {
        next(err)
    }
}