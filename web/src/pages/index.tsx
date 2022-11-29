import Image from 'next/image'

import logoImage from '../assets/logo.svg'
import mobileImage from '../assets/app-nlw-copa-preview.png'
import avatarsImage from '../assets/users-avatar-example.png'
import iconCheck from '../assets/icon-check.svg'

export default function Home() {
  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 items-center gap-28">
			<main>
				<Image src={logoImage} alt="NLW Copa" />

				<h1 className="mt-14 text-white text-5xl font-bold leading-tight">Crie seu próprio bolão da copa e compartilhe entre amigos!</h1>

				<div className="mt-10 flex items-center gap-2">
					<Image src={avatarsImage} alt="" />

					<strong className="text-gray-100 text-xl">
						<span className="text-ignite-500">+12.592</span> pessoas já estão usando
					</strong>
				</div>

				<form className="mt-10 flex gap-2">
					<input
						type="text"
						required
						placeholder="Qual nome do seu bolão?"
						className="flex-1 py-4 px-6 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100"
					/>

					<button
						type="submit"
						className="bg-yellow-500 py-4 px-6 rounded uppercase font-bold text-sm hover:bg-yellow-700 transition-colors"
					>
						Criar meu bolão
					</button>
				</form>

				<p className="text-gray-300 text-sm mt-4 leading-relaxed">
					Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀
				</p>

				<div className="mt-10 pt-10 border-t border-gray-600 grid grid-cols-2 divide-x divide-gray-600 text-gray-100">
					<div className="flex justify-start gap-6">
						<Image src={iconCheck} alt="" />

						<div className="flex flex-col">
							<span className="font-bold text-2xl">+2.034</span>
							<span>Bolões criados</span>
						</div>
					</div>

					<div className="flex justify-end gap-6">
						<Image src={iconCheck} alt="" />

						<div className="flex flex-col">
							<span className="font-bold text-2xl">+192.847</span>
							<span>Palpites enviados</span>
						</div>
					</div>
				</div>
			</main>

			<Image
				src={mobileImage}
				alt="Dois celulares exibindo uma prévia da aplicação móvel do NLW Copa"
				quality={100}
			/>
		</div>
  )
}
