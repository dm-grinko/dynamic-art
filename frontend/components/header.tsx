import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

interface IHeaderProps {
  title: string;
  description: string;
}

export default function Header({ title, description }: IHeaderProps) {

  const { userId: adminId }: any = auth();

  return (
    <div>

      <header className="text-center text-white">
        <div className="container">
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <h1 className="mb-0">{title}</h1>
          {
            adminId ?
                <Link className="btn header-btn btn-primary btn-xl rounded-pill m-5" href="/images">
                  Start
                </Link> :
                <Link className="btn header-btn btn-primary btn-xl rounded-pill m-5" href="/sign-in">
                  Sign In
                </Link>
            }
          <br />
        </div>
      </header>
    </div>
  );
}
