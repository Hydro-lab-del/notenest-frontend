

const AnimatedBackground = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">

                {/* Cyan Blob */}
                <div className="absolute top-[10%] left-[20%] w-72 h-72 bg-cyan-200/80 rounded-full mix-blend-multiply filter blur-[80px] animate-blob"></div>
                {/* Purple Blob */}
                <div className="absolute top-[20%] right-[30%] w-72 h-72 bg-purple-300/80 rounded-full mix-blend-multiply filter blur-[80px] animate-blob" style={{ animationDelay: '2s' }}></div>
                {/* Blue Blob */}
                <div className="absolute bottom-[20%] left-[30%] w-72 h-72 bg-blue-300/80 rounded-full mix-blend-multiply filter blur-[80px] animate-blob" style={{ animationDelay: '4s' }}></div>
                {/* Indigo Blob */}
                <div className="absolute bottom-[25%] right-[20%] w-64 h-64 bg-indigo-300/80 rounded-full mix-blend-multiply filter blur-[100px] animate-float"></div>

            </div>
  )
}

export default AnimatedBackground