const factory = require('./../controllers/handlerFactory');
const cloudinary = require('./../config/cloudinary');
const User = require('./../models/userModel');
const Tour = require('./../models/tourModel');
exports.getUser = factory.getOne(User);
exports.getAll = factory.getAll(User);
exports.deleteUser = factory.deleteOne(User);
exports.updateUser = factory.updateOne(User);
exports.createUser = factory.createOne(User);
exports.AddToWishList = factory.wishList(User);
exports.getWishList = factory.getWishList(User, 'wishList');
exports.uploadProfilePhoto = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please select an image"
            });
        }
        const stream =cloudinary.uploader.upload_stream({
            folder:'profile-photos',
            resource_type:"image"
        },
        async(error,result)=>{
            if(error){
                console.log(error);
                return res.status(500).json({
                    success:false,
                    message:"Image upload failed"
                });
            }
            const user = await User.findById(req.user.id);
            if(!user){
                return res.status(400).json({
                    success:false,
                    message:"User not found"
                })
            }
            console.log('hi6');
            user.profilePhoto  = result.secure_url;
            await user.save();
            res.status(200).json({
                success:true,
                message:"Profile photo updated successfully",
                profilePhoto:result.secure_url
            })
        }
    );
    stream.end(req.file.buffer);
    }catch(err){
        console.log('hi');
        res.status(500).json({
            success:false,
            message:err.message
        });
    }
};