import OneTestPage from '@/components/pages/OneTestPage';

export default function page() {
  return (
    <OneTestPage />
  );
}

// export async function getStaticPaths() {
//   const res = await fetch('https://interns-test-fe.snp.agency/api/v1/tests');
//   const id = await res.json();

//   const paths = id.map((i) => ({
//     params: { id: i.id },
//   }));

//   return { paths, fallback: true };
// }
