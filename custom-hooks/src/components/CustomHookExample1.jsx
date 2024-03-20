import useFetch from '../hooks/useFetch'

const CustomHookExample1 = () => {
  const { data, loading, error } = useFetch(
    'https://jsonplaceholder.typicode.com/posts',
    {}
  )
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  return (
    <div>
      {data.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  )
}

export default CustomHookExample1
