import styles from '../styles/Home.module.css'
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import Link from 'next/link';

export default function Home() {
	const [url, setUrl] = useState('');

	const [dialog, setDialog] = useState(false);
	const [error, setError] = useState(false);

	const check = () => {
		setDialog(true);
		// setError(true);
	}

	return (
		<div className={styles.container}>
			<img
				src='/logo.svg'
				style={{
					width: '10%',
					minWidth: '200px'

				}}
			/>
			<span className="p-input-icon-left p-mt-4">
				<i className="pi pi-search" />
				<InputText
					style={{
						width: '20vw',
						minWidth: '300px'
					}}
					value={url}
					onChange={(e) => setUrl(e.target.value)}
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
				<p>Тут будет задание</p>
				<Link
					href='https://google.com'
					target='_blank'
				>
					<a
						className='p-button'
						target="_blank"
					>
						Перейти
 					</a>
				</Link>
			</Dialog>
			<Dialog
				header="Ты не угадал("
				visible={error}
				style={{ 
					width: '50vw',
					minWidth: '370px'
				}}
				// footer={renderFooter('displayBasic')}
				onHide={() => setError(false)}
				baseZIndex={1000}
			>
				<Button
					label='Закрыть'
					onClick={() => { setError(false) }}
				/>
			</Dialog>
		</div>
	)
}
