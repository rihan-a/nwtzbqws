import Comments from './features/comments/components/Comments';

function App() {
    return (
        <>
            <main className="flex flex-col items-center justify-center w-[95%] lg:w-[80%] xl:w-[60%] m-auto mt-4 lg:mt-10 px-4">
                <h2 className="flex-start text-2xl lg:text-3xl font-bold w-full mb-6 lg:m-10">
                    Project Comments
                </h2>
                <Comments />
            </main>
        </>
    );
}

export default App;
