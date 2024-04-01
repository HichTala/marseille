export function AnnualTotal() {
    return (
        <div className="w-[180px] h-[120px] rounded-full pt-5 mt-12 border-8 border-customblue grid justify-items-center">
            <p>Total annuel:</p>
            <p> 9587 €</p>
        </div>
    );
}

export function SalesPerMounth() {
    return (
        <div className="flex m-2 justify-center items-center">
            <div className="main-container items-center text-darkblue dark:text-beige max-w-[300px] md:max-w-none">
                <div className="year-stats m-auto items-center">
                    <div className="month-group">
                        <div className="bar h-100"></div>
                        <p className="month">Jan</p>
                    </div>
                    <div className="month-group">
                        <div className="bar h-50"></div>
                        <p className="month">Fev</p>
                    </div>
                    <div className="month-group">
                        <div className="bar h-75"></div>
                        <p className="month">Mar</p>
                    </div>
                    <div className="month-group selected font-bold text-customblue dark:text-customwhite">
                        <div className="bar h-25"></div>
                        <p className="month">Avr</p>
                    </div>
                    <div className="month-group">
                        <div className="bar h-100"></div>
                        <p className="month">Mai</p>
                    </div>
                    <div className="month-group">
                        <div className="bar h-50"></div>
                        <p className="month">Jui</p>
                    </div>
                    <div className="month-group">
                        <div className="bar h-75"></div>
                        <p className="month">Jui</p>
                    </div>
                    <div className="month-group">
                        <div className="bar h-25"></div>
                        <p className="month">Aou</p>
                    </div>
                    <div className="month-group">
                        <div className="bar h-50"></div>
                        <p className="month">Sep</p>
                    </div>
                    <div className="month-group">
                        <div className="bar h-75"></div>
                        <p className="month">Oct</p>
                    </div>
                    <div className="month-group">
                        <div className="bar h-25"></div>
                        <p className="month">Nov</p>
                    </div>
                    <div className="month-group">
                        <div className="bar h-100"></div>
                        <p className="month">Dec</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function DetailsFacturation() {
    return (
        <div className="w-full max-w-[600px] border-2 border-gray-300 rounded-full overflow-hidden">
            <div className="flex justify-between w-full p-5 border-gray-300 hover:dark:bg-gray-700 cursor-pointer px-16 hover:bg-gray-300">
                <p>Prestalis</p>
                <p>240 €</p>
            </div>
            <div className="flex justify-between w-full p-5 border-t-2 border-gray-300 hover:dark:bg-gray-700 cursor-pointer px-16 hover:bg-gray-300">
                <p>Vert Marine</p>
                <p>500 €</p>
            </div>
            <div className="flex justify-between w-full p-5 border-t-2 border-gray-300 hover:dark:bg-gray-700 cursor-pointer px-16 hover:bg-gray-300">
                <p>ETC</p>
                <p>240 €</p>
            </div>
        </div>
    );
}