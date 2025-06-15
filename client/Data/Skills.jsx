import { FaPython,FaNodeJs,FaJava,FaGitAlt } from "react-icons/fa";
import { IoLogoFirebase } from "react-icons/io5";
import { SiScrapy,SiGooglecloud,SiJavascript, SiExpress, SiFlask, SiReact,SiSqlite,SiMongodb,SiQt,SiFastapi } from "react-icons/si";
import { FaDiscord,FaDocker,FaGolang } from "react-icons/fa6";
import { TbFileTypeSql } from "react-icons/tb";
import { BiLogoPostgresql } from "react-icons/bi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faC } from '@fortawesome/free-solid-svg-icons';

export const techSkills = [
    { name: "PYTHON", icon: FaPython },
    { name: "JAVASCRIPT", icon: SiJavascript },
    { name: "", icon: () => <FontAwesomeIcon icon={faC} /> },
    { name: "JAVA", icon: FaJava },
    { name: "GO", icon: FaGolang },
    { name: "SQL", icon: TbFileTypeSql },
    { name: "EXPRESS", icon: SiExpress },
    { name: "FAST-API", icon: SiFastapi },
    { name: "NODE JS", icon: FaNodeJs },
    { name: "DISCORD PY", icon: FaDiscord },
    { name: "SCRAPY", icon: SiScrapy },
    { name: "FLASK", icon: SiFlask },
    { name: "REACT", icon: SiReact },
    { name: "PYQT5", icon: SiQt },
    { name: "POSTGRE-SQL", icon: BiLogoPostgresql },
    { name: "MONGODB", icon: SiMongodb },
    { name: "SQLITE", icon: SiSqlite },
    { name: "FIREBASE", icon: IoLogoFirebase },
    { name: "GCP", icon: SiGooglecloud },
    { name: "DOCKER", icon: FaDocker },
    { name: "GIT", icon: FaGitAlt }
];
