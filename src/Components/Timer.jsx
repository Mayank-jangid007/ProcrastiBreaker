import React, { useEffect, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { VscDebugRestart } from "react-icons/vsc";
import { motion, AnimatePresence } from "framer-motion";

function Timer() {
    const [timer, setTimer] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let intervalId;
        if (isRunning) {
            console.log("-----");
            
            intervalId = setInterval(() => {
                setTimer(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [isRunning]);

    const hours = Math.floor(timer / 3600);
    const minutes = Math.floor((timer % 3600) / 60);
    const seconds = timer % 60;

    const formatNumber = (num) => num.toString().padStart(2, '0');

    const toggleTimer = () => setIsRunning(!isRunning);
    const resetTimer = () => {
        setIsRunning(false);
        setTimer(0);
    };

    return (
        <div className="w-full h-full bg-transparent flex justify-center items-center">
            {/* Timer Container with animations */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-[90%] max-w-3xl relative"
            >
                {/* Main Timer Card */}
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-5 md:py-5 shadow-2xl border border-white/10 relative overflow-hidden">
                    {/* Animated Gradient Border */}
                    <motion.div 
                        className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500 rounded-3xl opacity-20 blur-xl z-0"
                        animate={{ 
                            rotate: 360,
                            scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                            duration: 10,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />

                    {/* Time Display */}
                    <motion.div 
                        className="relative z-10 mb-8 text-center"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <div className="text-5xl font-bold flexjustify-center text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/80 font-mono tracking-wider">
                            <span>{formatNumber(hours)}</span>
                            <motion.span 
                                animate={{ opacity: [1, 0.3, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                                className="mx-2 text-orange-500"
                            >:</motion.span>
                            <span>{formatNumber(minutes)}</span>
                            <motion.span 
                                animate={{ opacity: [1, 0.3, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                                className="mx-2 text-orange-500"
                            >:</motion.span>
                            <span>{formatNumber(seconds)}</span>
                        </div>
                        
                        {/* Time Labels */}
                        <div className="flex justify-center gap-[2.2rem] mt-4 ml-5 items-center text-white/50 text-sm tracking-widest">
                            <span>HOURS</span>
                            <span>MINUTES</span>
                            <span>SECONDS</span>
                        </div>
                    </motion.div>

                    {/* Controls */}
                    <div className="relative z-10 flex justify-center gap-6">
                        <motion.button
                            onClick={toggleTimer}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className={`p-6 rounded-2xl ${
                                isRunning 
                                    ? 'bg-red-500/20 hover:bg-red-500/30' 
                                    : 'bg-green-500/20 hover:bg-green-500/30'
                            } backdrop-blur-sm transition-all duration-300`}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={isRunning ? 'pause' : 'play'}
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    exit={{ scale: 0, rotate: 180 }}
                                    className="text-white"
                                >
                                    {isRunning ? <FaPause size={28} /> : <FaPlay size={28} />}
                                </motion.div>
                            </AnimatePresence>
                        </motion.button>

                        <motion.button
                            onClick={resetTimer}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-6 rounded-2xl bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
                        >
                            <motion.div 
                                className="text-white"
                                whileHover={{ rotate: 180 }}
                                transition={{ type: "spring", stiffness: 200 }}
                            >
                                <VscDebugRestart size={28} />
                            </motion.div>
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default Timer;