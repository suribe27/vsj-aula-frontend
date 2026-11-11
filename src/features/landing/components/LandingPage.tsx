import { LinkButton } from '@/features/common/components/Button';

const STEPS = [
  {
    title: 'Responde la encuesta',
    text: 'Seis preguntas sobre tu semestre y cómo te sientes. Toma menos de dos minutos.',
  },
  {
    title: 'Conoce tu nivel de riesgo',
    text: 'Calculamos un puntaje de 0 a 100 que combina tu rendimiento académico y tu bienestar.',
  },
  {
    title: 'Recibe apoyo a tiempo',
    text: 'Si el riesgo es alto o crítico, te recomendamos los servicios de Bienestar que más te sirven.',
  },
];

const AUDIENCES = [
  {
    title: 'Para estudiantes',
    text: 'Un espacio confidencial para revisar cómo vas y encontrar ayuda antes de que un mal momento se vuelva un problema grande.',
  },
  {
    title: 'Para Bienestar Universitario',
    text: 'Estadísticas anónimas del riesgo de la comunidad y un catálogo de servicios fácil de mantener.',
  },
];

export function LandingPage() {
  return (
    <div className="flex flex-col gap-20 pb-10">
      <section className="grid items-center gap-10 pt-6 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-teal-700 dark:text-teal-400">
            Bienestar universitario
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl dark:text-slate-50">
            Detecta a tiempo cuando el semestre se pone difícil
          </h1>
          <p className="mt-5 max-w-xl text-lg text-slate-600 dark:text-slate-300">
            Alerta Temprana combina tus notas y una breve encuesta de bienestar para calcular tu nivel
            de riesgo académico-emocional y conectarte con los servicios de apoyo de la universidad.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href="/register">Empezar ahora</LinkButton>
            <LinkButton href="/servicios" variant="secondary">
              Ver servicios de Bienestar
            </LinkButton>
          </div>
        </div>
        <div className="relative rounded-3xl bg-gradient-to-br from-teal-600 to-sky-700 p-8 text-white shadow-xl">
          <p className="text-sm font-medium opacity-80">Ejemplo de resultado</p>
          <p className="mt-2 text-6xl font-bold">
            38<span className="text-2xl font-medium opacity-80"> / 100</span>
          </p>
          <p className="mt-2 inline-flex rounded-full bg-white/20 px-3 py-1 text-sm font-semibold">
            Riesgo medio
          </p>
          <p className="mt-6 text-sm leading-relaxed opacity-90">
            “Hay algunas señales para tener en cuenta. Te sugerimos el taller de manejo del estrés y
            las tutorías de matemáticas.”
          </p>
        </div>
      </section>

      <section aria-labelledby="como-funciona">
        <h2 id="como-funciona" className="text-2xl font-bold text-slate-900 dark:text-slate-50">
          Cómo funciona
        </h2>
        <ol className="mt-6 grid gap-5 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <li
              key={step.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-700 font-bold text-white">
                {index + 1}
              </span>
              <h3 className="mt-4 font-semibold text-slate-900 dark:text-slate-100">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="para-quien" className="grid gap-5 md:grid-cols-2">
        <h2 id="para-quien" className="sr-only">
          Para quién es
        </h2>
        {AUDIENCES.map((audience) => (
          <article
            key={audience.title}
            className="rounded-2xl bg-slate-100 p-6 dark:bg-slate-800/60"
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{audience.title}</h3>
            <p className="mt-2 text-slate-600 dark:text-slate-300">{audience.text}</p>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-teal-200 bg-teal-50 p-8 text-center dark:border-teal-900 dark:bg-teal-950/40">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Tu privacidad es lo primero</h2>
        <p className="mx-auto mt-3 max-w-2xl text-slate-700 dark:text-slate-300">
          Solo tú puedes ver tus respuestas. Bienestar recibe estadísticas anónimas: nunca tu nombre ni tu
          correo.
        </p>
      </section>
    </div>
  );
}
