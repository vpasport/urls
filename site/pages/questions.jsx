import styles from '../styles/Home.module.css'
import { InputText } from 'primereact/inputtext';
import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Fieldset } from 'primereact/fieldset';
import Link from 'next/link';

function Questions() {
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
                    legend={quest.finish ? '??????????????????????!' : '??????????????'}
                    style={{
                        minWidth: '300px',
                        width: '30vw'
                    }}
                >
                    {quest.finish ?
                        <>
                            <h3>???? ???????????????? ?????? ??????????????!</h3>
                            <p>?????????????? ???????? ?????????? ?? ?????? ??????????????????????, ?? ?????????? ????????????????</p>
                            <a
                                className='p-button'
                                target="_blank"
                                href={quest?.url}
                            >
                                ?????????????? ??????????
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
                                ?????????????? ???? ????????
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
                    placeholder="?????????????? ??????????"
                />
            </span>
            <Button
                className='p-mt-4'
                label="??????????????????"
                onClick={check}
            />
            <Dialog
                header="???? ????????????!"
                visible={dialog}
                style={{
                    width: '50vw',
                    minWidth: '370px'
                }}
                // footer={renderFooter('displayBasic')}
                onHide={() => setDialog(false)}
                baseZIndex={1000}
            >
                <h3>?????????????????? ??????????????:</h3>
                <p>{quest?.question}</p>
                <Link
                    href={quest?.url}
                    target='_blank'
                >
                    <a
                        className='p-button'
                        target="_blank"
                        href={quest?.url}
                        onClick={() => setDialog(false)}
                    >
                        ?????????????? ???? ????????
 					</a>
                </Link>
            </Dialog>
            <Dialog
                header="????????????????????!"
                visible={finish}
                style={{
                    width: '50vw',
                    minWidth: '370px'
                }}
                // footer={renderFooter('displayBasic')}
                onHide={() => setFinish(false)}
                baseZIndex={1000}
            >
                <h3>???? ???????????????? ?????? ??????????????!</h3>
                <p>?????????????? ???????? ?????????? ?? ?????? ??????????????????????, ?? ?????????? ????????????????</p>
                <a
                    className='p-button'
                    target="_blank"
                    href={quest?.url}
                >
                    ?????????????? ??????????
				</a>
            </Dialog>
            <Dialog
                header="???? ????????????"
                visible={error}
                style={{
                    width: '50vw',
                    minWidth: '370px'
                }}
                // footer={renderFooter('displayBasic')}
                onHide={() => setError(false)}
                baseZIndex={1000}
            >
                <p>???? ???????????? ?????????????????? ?????????? ?? ?????????????????? ?????????? ?????? ?????????????????? ?? ?????????????? ?? ?????????????????????? ??????</p>
                <Button
                    label='???????????????????? ?????? ??????'
                    onClick={() => { setError(false) }}
                />
                <a
                    className='p-button p-button-danger p-ml-2'
                    target="_blank"
                    href='https://forms.gle/UDebFA7nJhiHKwHa7'
                >
                    ?????????????? ??????????
				</a>
            </Dialog>
        </div>
    )
}

export default Questions;