const { cloudinary } = require("../config/cloudinary")
const streamifier = require("streamifier")

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" })
    }

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "roxyez",
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            console.log("Cloudinary error:", JSON.stringify(error))
            reject(error)
          } else {
            resolve(result)
          }
        }
      )
      streamifier.createReadStream(req.file.buffer).pipe(stream)
    })

    res.json({ url: result.secure_url })
  } catch (error) {
    console.log("Upload error:", error.message)
    res.status(500).json({ message: error.message })
  }
}