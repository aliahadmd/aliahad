import Image from './Image'
import Link from './Link'

const Card = ({ title, technology, description, imgSrc, href, gref }) => {
  return (
    <div className="md p-4 md:w-full">
      <div
        className={`${
          imgSrc && 'h-full'
        }  transform overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105 dark:border-gray-700`}
      >
        {imgSrc &&
          (href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              <Image
                alt={title}
                src={imgSrc}
                className="object-cover object-center md:h-36 lg:h-48"
                width={544}
                height={306}
              />
            </Link>
          ) : (
            <Image
              alt={title}
              src={imgSrc}
              className="object-cover object-center md:h-36 lg:h-48"
              width={544}
              height={306}
              loading="lazy"
            />
          ))}
        <div className="p-6">
          <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
            {href ? (
              <Link href={href} aria-label={`Link to ${title}`}>
                {title}
              </Link>
            ) : (
              title
            )}
          </h2>

          <div className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text font-bold italic text-transparent">
            {technology}
          </div>

          <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">{description}</p>

          <Link
            href={href}
            className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label={`Link to ${title}`}
          >
            <button className="h-8 w-32 rounded-full border-2 border-gray-200 border-opacity-60 dark:border-gray-700 ">
              {' '}
              View Project{' '}
            </button>
          </Link>
          <Link
            href={gref}
            className="pl-4 text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label={`Link to ${title}`}
          >
            <button className="h-8 w-32 rounded-full border-2 border-gray-200 border-opacity-60 dark:border-gray-700 ">
              {' '}
              Github{' '}
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Card
