const questions = [
    {
        url: 'https://lifehacker.ru/ispanskij-styd/',
        question: 'В одном из разделов статьи сказано, что, как правило, из племени не выбрасывают ярких и востребованных персон. Кто, судя по статье, также относится к данной группе? Ответ запишите в форме существительного единственного числа именительного падежа.',
        answer: 'лидер'
    },
    {
        url: 'https://nplus1.ru/blog/2021/03/01/freezing-warming',
        question: 'В статье физический механизм, разъясняющий парадокс похолодания в умеренных широтах одних материков из-за потебления других, объясняется "на пальцах". В объяснении говорится об определенном процессе. Как этот процесс называют географы? Ответ записать в той же форме, в которой он дан в статье и без кавычек.',
        answer: 'западным переносом воздушных масс'
    },
    {
        url: 'https://www.psychologies.ru/wellbeing/pochemu-myi-prosyipaemsya-po-nocham-i-kak-pomoch-sebe-snova-zasnut/',
        question: 'В какой части тела, согласно китайским врачам, должен храниться наш запас жизненных сил в состоянии покоя? В ответе укажите одно слово в его начальной форме.',
        answer: 'живот'
    },
    {
        url: 'https://newtonew.com/science/pravda-o-serotonine-dvoynoy-agent-schastya',
        question: 'В статье говорится о проведенном на мышах эксперименте, в результате которого было установлено, что в разных группах у животных серотонин действовал на разные нейроны. У счастливых мышей он снизил активность Х, а у измученных — повысил. Запишите Х тремя словами в форме, что была использована в статье',
        answer: 'верхнего дорсального ядра'
    },
    {
        url: 'https://ology.sh/comprehend/prekrasnye-kristallicheskie-formy/',
        question: 'В одной из основных групп классификации снежинок есть категория, которую японский ученый Кацухиро Кикучи назвал определенным словом. Это слово обозначает ритуальный жезл с бумажными лентами, который синтоисты используют для очищения от негативной энергии. Укажите, что это за слово.',
        answer: 'гохэй'
    },
    {
        url: 'https://nplus1.ru/material/2021/03/01/it-success-stories',
        question: 'В одном из разделов статьи приведена история компании торговавшей книгами. Укажите какую возможность добавили(одним словом) для реализации идеи об "обмене мнениями", ответ должен должен быть записан в той же форме, что использована в тексте статьи.',
        answer: 'рецензии'
    },
    {
        url: 'https://naked-science.ru/article/nakedscience/zhivem-li-my-v',
        question: 'Кто применил концепцию позитрона ко всем возникновением и аннигиляции пар частица-античастица в своей статье, опубликованной в 1950 году?',
        answer: 'йотиро намбу'
    },
    {
        url: 'https://www.ology.sh/brainwrecks/chego-boiatsia-kogda-nechego-boiatsia/',
        question: 'В одном из разделов статьи приведена цитата Евгения Пашнина, где он говорит о панических расстройствах. Там же он указал на каком уровне оно проявляется в изменении мндалевидного тела. Укажите какой это уровень (одним словом), ответ должен должен быть записан в той же форме, что использавана в тексте статьи.',
        answer: 'физиологическом'
    },
    {
        url: 'https://newtonew.com/science/vredno-li-byt-umnym',
        question: 'Согласно опросам, которые были проведены в рамках одной научной работы, укажите, во сколько раз чаще люди, занимающиеся научной деятельностью, сообщают о симптомах депрессии, чем люди, которые далеки от научной сферы. (ответ должен быть записан в виде одного слова)',
        answer: 'шесть'
    },
    {
        url: 'https://nplus1.ru/material/2021/02/03/on-violet-windows',
        question: 'В одном из разделов статьи приведена попытка агрономов "скормить" растениям красный свет. С появлением определенного прибора, их результаты изменились. Укажите какой это прибор(одним словом), ответ должен быть записан в форме именительного падежа единственного числа.',
        answer: 'светодиод'
    },
    {
        url: 'https://paleonews.ru/paleontologiya/vymiranie-dinozavrov-prichiny-gipotezy-i-teorii',
        question: 'Что, согласно статье, привело к увеличению космического излучения, оказавшего губительное влияние на флору и фауну. Ответ записать четырьмя словами, в той же форме, что приведена в статье.',
        answer: 'ослаблению магнитного поля земли'
    },
    {
        url: 'https://ology.sh/comprehend/mnogo-shuma-iz-polimerov/',
        question: 'В ответ на вопрос: насколько токсичен микропластик, в статье приводится проблема заключающаяся в пищевой цепочке живых существ. Укажите, кто является замыкающим звеном этой цепи?',
        answer: 'человек'
    },
    {
        url: 'https://elementy.ru/problems/986/Kak_lomayutsya_spagetti',
        question: 'В одном из разделов статьи автор пишет, что в изогнутом состоянии на спагеттину действуют внутренние напряжения и в ее толще возникают деформации. Какая деформация происходит во внешней части спаггетины?',
        answer: 'растяжение'
    }
]

const finish = {
    url: 'https://forms.gle/QdCTQfKDiAmssjoFA'
}

function index(server) {
    server.get('/', (req, res) => {
        res.sendStatus(204);
    })

    server.get('/question', ({ session }, res) => {
        if (session.question !== undefined) {
            const id = session.question;

            if (id === -1) {
                res.json({
                    finish: true,
                    ...finish
                });
                return;
            }

            if (id === session.lastAnswer) {

                if (id >= 0 && id < questions.length) {
                    session.question += 1;

                    res.json({
                        url: questions[id + 1].url,
                        question: questions[id + 1].question
                    });
                    return;
                }
            } else {
                res.json({
                    url: questions[id].url,
                    question: questions[id].question
                })
                return;
            }
        } else {
            session.question = 0;

            res.json({
                url: questions[0].url,
                question: questions[0].question
            })
            return;
        }

        res.sendStatus(520);
    });

    server.get('/question/:id', ({ params: { id } }, res) => {
        if (id >= 0 && id < questions.length) {
            res.json({
                url: questions[id].url,
                question: questions[id].question
            });
            return;
        }

        res.sendStatus(520);
    })

    server.post('/answer', ({ body: { word }, session }, res) => {
        word = word.toLowerCase().trim();

        if (session.lastAnswer === undefined) {
            if (word === questions[0].answer) {
                session.lastAnswer = 0;

                res.json({
                    nextQuestion: 1
                });
                return;
            }

            res.sendStatus(520);
            return;
        } else {
            if (session.lastAnswer < questions.length - 1
                && word === questions[session.lastAnswer + 1].answer) {
                session.lastAnswer += 1;

                if (session.lastAnswer === questions.length - 1) {
                    session.question = -1;
                    res.json({
                        nextQuestion: -1
                    })
                    return;
                }

                res.json({
                    nextQuestion: session.lastAnswer + 1
                });
                return;
            } else if (session.lastAnswer === questions.length - 1) {
                res.sendStatus(204);
                return;
            } else {
                res.sendStatus(520);
                return;
            }
        }
    })

}

module.exports = index;