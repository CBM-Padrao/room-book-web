export function Login() {
  return (
    <div className="grid grid-cols-[850px_1fr] justify-items-center h-screen">
      <aside className="w-full h-full flex flex-col justify-center items-center bg-slate-600 text-white">
        <h1>Login</h1>
        <p>Log in to your account</p>
      </aside>

      <form className="flex flex-col justify-center p-10 gap-4 w-[550px]">
        <label htmlFor="registration" className="text-zinc-800">
          Matrícula
        </label>
        <input
          type="text"
          name="registration"
          className="bg-slate-200 p-2 rounded-md text-slate-700"
        />

        <label htmlFor="password" className="text-zinc-800">
          Senha
        </label>
        <input
          type="password"
          name="password"
          className="bg-slate-200 p-2 rounded-md  text-slate-700"
        />

        <button
          type="submit"
          className="bg-slate-500 rounded-md p-2 text-white mt-3"
        >
          Login
        </button>
      </form>
    </div>
  );
}
