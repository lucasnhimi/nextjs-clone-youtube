import Layout from 'src/components/Layout';
import { useRouter } from 'next/router';
import { Button } from '@material-ui/core';

function Video() {
  const router = useRouter();

  return (
    <Layout>
      <span>{router.query.id}</span>
      <Button onClick={() => router.back()}>Voltar</Button>
    </Layout>
  );
}

export default Video;
