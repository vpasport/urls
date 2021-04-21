import styles from '../styles/Home.module.css'
import { InputText } from 'primereact/inputtext';
import { useEffect, useReducer, useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Fieldset } from 'primereact/fieldset';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Home() {
	const router = useRouter();

	return (
		<div className={styles.container}>
			<img
				src='/logo.svg'
				style={{
					width: '10%',
					minWidth: '200px',
					marginTop: '10vw'
				}}
			/>
			<div
				style={{
					minWidth: '300px',
					width: '30vw',
					textAlign: 'center',
					marginBottom: '30vw'
				}}
			>
				<h3>Что делать?</h3>
				<p>
					Приветствуем тебя на онлайн-квесте WorldWideWeb! Этот квест проведёт тебя по интересным научным статьям и научит быстро искать нужное в больших массивах информации. Предлагаем тебе немного познакомиться с правилами онлайн-квеста.
				</p>
				<p>
					После начала квеста, ты увидишь первое задание и кнопку для перехода на статью.
					Чтобы ответить на вопрос, прочитай статью и найди нужную информацию, после вернись на страницу с заданием и ответь на поставленный вопрос.
					Внимательно читай формулировку вопроса, ответ записанный в неверной форме приниматься не будет!
					После введения ответа, на экран будет выведен результат, и, если ответ был верным появиться новое задание, чтобы ввести следующий ответ просто закрой окошко с результатом.
					По окончании прохождения квеста тебе будет предложено заполнить форму обратной связи, не игнорируй её, по этим данным мы сможем связаться с тобой, в случае твоей победы.
				</p>
				<p>
					Удачи!
				</p>
				<Button
					label='Начать!'
					onClick={() => router.push('/questions')}
				/>
			</div>
		</div>
	)
}
