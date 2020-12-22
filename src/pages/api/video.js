import nc from 'next-connect';
import upload from 'src/utils/upload';

const handler = nc()
  .use(upload.single('file'))
  .post((req, res) => {
    // receber nossa imagem e outros dados pelo endpoint
    // inserir no banco de dados MONGODB
    const { title, authorName, authorAvatar, videoUrl } = req.body;

    res.json({ hello: 'world' });
  })
  .patch(async (req, res) => {
    throw new Error('Throws me around! Error can be caught and handled.');
  });

export default handler;
