import CallToAction from '../components/CallToAction';

function Projects() {
return (
    <div className='min-h-screen max-w-4xl mx-auto flex justify-center gap-8 items-center flex-col p-6'>
        <h1 className='text-4xl font-bold text-center'>Explore My Projects</h1>
        <p className='text-lg text-gray-600 text-center max-w-3xl'>
        {/* Explanation about my html, css and Js Projects and Mern stack full stack projects like abuki estate, student forum, clones of netflix, apple, etc */}
        Welcome to the Projects page! Here, you'll find a collection of my personal projects that I've built to enhance my skills and share with the community. These projects range from simple HTML, CSS, and JavaScript applications to more complex full-stack applications built with the MERN stack (MongoDB, Express.js, React, Node.js). Some of the highlights include Abuki Estate, a real estate listing platform; Student Forum, a community forum for students; and clones of popular websites like Netflix and Apple. Each project is a testament to my dedication to learning and improving as a developer, and I hope they inspire you to create your own projects as well!
        </p>
        <div className='w-full flex flex-col gap-6'>
        <section className='bg-gray-100 p-6 rounded-lg shadow-md'>
            <h2 className='text-2xl font-semibold dark:text-gray-900'>
            Why Build Projects?
            </h2>
            <p className='text-gray-700 mt-2'>
            Building projects is an essential part of the learning process for any developer. It allows you to apply the concepts you've learned in a practical way, helping to solidify your understanding and improve your problem-solving skills. Projects also provide an opportunity to experiment with new technologies and tools, giving you hands-on experience that can be invaluable when it comes to job interviews or real-world applications. Additionally, having a portfolio of projects can showcase your skills and creativity to potential employers or collaborators, making it easier to stand out in a competitive job market.
            </p>
        </section>
        <section className='bg-gray-100 p-6 rounded-lg shadow-md'>
            <h2 className='text-2xl font-semibold dark:text-gray-900'>
            What Can You Expect from My Projects?
            </h2>
            <ul className='list-disc list-inside text-gray-700 mt-2'>
                <li>Real-world applications of HTML, CSS, and JavaScript</li>
                <li>Full-stack development with the MERN stack</li>
                <li>Responsive and accessible web design</li>
                <li>Best practices for code organization and maintainability</li>
                <li>Integration of third-party APIs and services</li>
            </ul>
        </section>
        </div>
        <CallToAction />
    </div>
    );
}

export default Projects;