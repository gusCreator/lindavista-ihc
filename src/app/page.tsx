'use client';

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [query, setQuery] = useState<string>(searchParams.get('q') || '');
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set('q', query);
    } else {
      params.delete('q');
    }
    replace(`${pathname}?${params.toString()}`);
  };
  const handleInputChange = (val: string) => {
    setQuery(val);
  };
  return (
    <div className="flex flex-col min-h-dvh p-14">
      <header className="flex flex-col gap-6">
        <h1 className="text-6xl text-center text-">Lindavista</h1>
        <search>
          <form className="flex flex-row gap-4" onSubmit={handleSubmit}>
            <input
              className="border-blue-800 border-2 rounded-lg flex-1 m-3 px-2 py-1"
              value={query}
              onChange={(e) => handleInputChange(e.target.value)} />
            <button className="flex-initial rounded-full bg-blue-800 aspect-square flex items-center justify-center hover:scale-105 hover:saturate-50 transition-all duration-300" type="submit">
              <Image src="/search.svg" alt="Go to search" width={20} height={20} />
            </button>
          </form>
        </search>
      </header>
    </div>
  );
}
