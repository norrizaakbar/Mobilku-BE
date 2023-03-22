const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const { log } = require("console");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dntojzudz",
  api_key: "823138718899156",
  api_secret: "SDhnAHuChzl9JNtT_3ROPf1vpV0",
});

class UserController {
  static async create(req, res) {
    const { name, usia, mobile, city, education } = req.body;
    const age = +usia;
    const imagePath = "./images/" + req.file.filename;
    const outputImagePath = "./images/resized500-" + req.file.filename;
    const outputImagePath2 = "./images/resized1000-" + req.file.filename;

    try {
      if (!req.file) {
        throw new Error("No file uploaded");
      }

      // Mengunggah gambar ke Cloudinary
      const image500 = await sharp(imagePath).resize(500, 500).toBuffer();

      const tmpFilePath500 = path.join(__dirname, "../images/", "image500.jpg");
      fs.writeFileSync(tmpFilePath500, image500);
      const result500 = await cloudinary.uploader.upload(tmpFilePath500, {
        public_id: "mobilku",
      });

      const image1000 = await sharp(imagePath).resize(1000, 1000).toBuffer();
      const tmpFilePath1000 = path.join(
        __dirname,
        "../images/",
        "image500.jpg"
      );
      fs.writeFileSync(tmpFilePath1000, image1000);
      const result1000 = await cloudinary.uploader.upload(tmpFilePath1000, {
        public_id: "mobilku",
        // buffer: image1000,
      });

      const post = await prisma.user.create({
        data: {
          name,
          usia: age,
          mobile,
          city,
          education,
          image500: result500.secure_url,
          image1000: result1000.secure_url,
        },
      });

      res.status(200).json({ message: "Success Create User", post });
    } catch (error) {
      //   console.log(error);
      res.status(400).json({ error: error.message });
    }
  }

  static async getUser(req, res) {
    // console.log("kepanggil");
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      });

      if (!user) {
        res.status(404).json({ error: "User not found" });
      } else {
        res.status(200).json(user);
        // res.render(user);
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async update(req, res) {
    const { name, usia, mobile, city, education } = req.body;
    const age = +usia;
    const imagePath = "./images/" + req.file.filename;

    try {
      const user = await prisma.user.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      let dataToUpdate = {
        name,
        usia: age,
        mobile,
        city,
        education,
      };

      // Jika ada file yang diupload, manipulasi gambar dengan sharp dan update field image
      if (req.file) {
        const image500 = await sharp(imagePath).resize(500, 500).toBuffer();

        const tmpFilePath500 = path.join(
          __dirname,
          "../images/",
          "image500.jpg"
        );
        fs.writeFileSync(tmpFilePath500, image500);
        const result500 = await cloudinary.uploader.upload(tmpFilePath500, {
          public_id: "mobilku",
        });

        const image1000 = await sharp(imagePath).resize(1000, 1000).toBuffer();
        const tmpFilePath1000 = path.join(
          __dirname,
          "../images/",
          "image500.jpg"
        );
        fs.writeFileSync(tmpFilePath1000, image1000);
        const result1000 = await cloudinary.uploader.upload(tmpFilePath1000, {
          public_id: "mobilku",
          // buffer: image1000,
        });
        dataToUpdate.image500 = result500.secure_url;
        dataToUpdate.image1000 = result1000.secure_url;
      }

      const updatedUser = await prisma.user.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: dataToUpdate,
      });

      res.status(200).json({ message: "User Updated!", updatedUser });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = UserController;
