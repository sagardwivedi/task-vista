import { useEffect } from "react";

interface TypewriterProps {
    text: string | string[]
    spped: number
}

export const Typewriter = ({ text, speed }:TypewriterProps) => {
    const [displayText, setDisplayText] = useState('');
    const [index, setIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(true);

    useEffect(()=>{
        const texts = Array.isArray(text) ? text : [text]
        if (index < texts.length && isTyping) {
            
        }
    },[])
}