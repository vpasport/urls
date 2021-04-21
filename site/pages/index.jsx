import styles from '../styles/Home.module.css'
import { InputText } from 'primereact/inputtext';
import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Fieldset } from 'primereact/fieldset';
import Link from 'next/link';

export default function Home() {
	const [word, setWord] = useState('');

	const [dialog, setDialog] = useState(false);
	const [error, setError] = useState(false);
	const [finish, setFinish] = useState(false);

	const [quest, setQuest] = useState(null);

	const check = async () => {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/answer`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				word
			})
		})

		if (!response.ok) {
			setError(true);
			return;
		}
		
		await getQuest();

		if (response.status === 204) {
			setFinish(true);
			return;
		}

		const { nextQuestion } = await response.json();

		
		if (nextQuestion === -1) {
			setFinish(true);
			return;
		}

		setDialog(true);
	}

	const getQuest = async () => {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/question`, {
			credentials: 'include'
		})

		const quest = await response.json();

		if (quest.finish) {
			setFinish(true);
			setQuest(quest);
			return;
		}

		setQuest(quest);
		setWord('');
	}

	useEffect(() => {
		getQuest();
	}, [])

	return (
		<div className={styles.container}>
			<img
				src='/logo.svg'
				style={{
					width: '10%',
					minWidth: '200px'

				}}
			/>
			{quest &&
				<Fieldset
					legend={quest.finish ? 'Поздравляем!' : 'Задание'}
					style={{
						minWidth: '300px',
						width: '30vw'
					}}
				>
					{quest.finish ?
						<>
							<h3>Ты выполнил все задания!</h3>
							<p>Заполни гугл форму и жди результатов, с тобой свяжутся</p>
							<a
								className='p-button'
								target="_blank"
								href={quest?.url}
							>
								Открыть форму
 							</a>
						</>
						:
						<>
							<p>{quest?.question}</p>
							<a
								className='p-button'
								target="_blank"
								href={quest?.url}
							>
								Перейти на сайт
 						</a>
						</>
					}
				</Fieldset>
			}
			<span className="p-input-icon-left p-mt-4">
				<i className="pi pi-search" />
				<InputText
					style={{
						width: '20vw',
						minWidth: '300px'
					}}
					value={word}
					onChange={(e) => setWord(e.target.value)}
					placeholder="Введите слово"
				/>
			</span>
			<Button
				className='p-mt-4'
				label="Проверить"
				onClick={check}
			/>
			<Dialog
				header="Ты угадал!"
				visible={dialog}
				style={{
					width: '50vw',
					minWidth: '370px'
				}}
				// footer={renderFooter('displayBasic')}
				onHide={() => setDialog(false)}
				baseZIndex={1000}
			>
				<h3>Следующее задание:</h3>
				<p>{quest?.question}</p>
				<Link
					href={quest?.url}
					target='_blank'
				>
					<a
						className='p-button'
						target="_blank"
						href={quest?.url}
					>
						Перейти на сайт
 					</a>
				</Link>
			</Dialog>
			<Dialog
				header="Поздравлем!"
				visible={finish}
				style={{
					width: '50vw',
					minWidth: '370px'
				}}
				// footer={renderFooter('displayBasic')}
				onHide={() => setFinish(false)}
				baseZIndex={1000}
			>
				<h3>Ты выполнил все задания!</h3>
				<p>Заполни гугл форму и жди результатов, с тобой свяжутся</p>
				<a
					className='p-button'
					target="_blank"
					href={quest?.url}
				>
					Открыть форму
				</a>
			</Dialog>
			<Dialog
				header="Не угадал"
				visible={error}
				style={{
					width: '50vw',
					minWidth: '370px'
				}}
				// footer={renderFooter('displayBasic')}
				onHide={() => setError(false)}
				baseZIndex={1000}
			>
				<p>Ты можешь завершить квест и заполнить форму или вернуться к заданию и попробовать еще</p>
				<Button
					label='Поробовать еще раз'
					onClick={() => { setError(false) }}
				/>
				<a
					className='p-button p-button-danger p-ml-2'
					target="_blank"
					href='https://forms.gle/UDebFA7nJhiHKwHa7'
				>
					Открыть форму
				</a>
			</Dialog>
		</div>
	)
}
