export default async function handler(req, res) {
  const requestMethod = req.method;

  switch (requestMethod) {
    case 'POST':
      try {
        const response = await fetch('https://interns-test-fe.snp.agency/api/v1/signin', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'scope-key': 'hJSv{7A8jcm4<U^}f)#E`e',
          },
          body: req.body,
        });

        const user = await response.json();
        res.json(user);
        console.log(res);
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
      break;
    case 'GET':
      try {
        const response = await fetch('https://interns-test-fe.snp.agency/api/v1/users/current', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'scope-key': 'hJSv{7A8jcm4<U^}f)#E`e',
          },
        });

        const user = await response.json();
        res.json(user);
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
      break;
    case 'DELETE':
      try {
        const response = await fetch('https://interns-test-fe.snp.agency/api/v1/logout', {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'scope-key': 'hJSv{7A8jcm4<U^}f)#E`e',
          },
        });

        const user = await response.json();
        console.log(user, 'delete');
        res.json(user);
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
      break;
    default:
      res.status(405).end();
  }
}
