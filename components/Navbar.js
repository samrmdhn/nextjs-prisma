import Link from "next/link";
export default function Navbar() {
  return (
    <div>
      <ul>
        <li>
          <Link href={`/users`}>
            <a>Users</a>
          </Link>
        </li>
        <li>
          <Link href={`/products`}>
            <a>Products</a>
          </Link>
        </li>
        <li>
          <Link href={`/categories`}>
            <a>Categories</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
