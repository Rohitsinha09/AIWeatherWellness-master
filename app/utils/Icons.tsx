import {
    Command,
    Github,
    Search,
    CloudDrizzle,
    CloudRain,
    Snowflake,
    CloudSun,
    Cloudy,
    Navigation,
    ThermometerSun,
    Sunset,
    Wind,
    Gauge,
    Droplets,
    Thermometer,
    Eye,
    UsersRound,
    CalendarDays,
    SunDim,
    CloudLightning,
    TornadoIcon,
    Sunrise,
    Moon,
    ImagePlusIcon,
    History,
    AlignJustifyIcon,
    MessageSquare,
    Mic,
    Settings,
  } from "lucide-react";
  import {LiaImage,LiaPlusSolid,LiaQuestionCircle  } from "react-icons/lia";
  import { MdOutlineStopCircle } from "react-icons/md";
  import { FaHandHoldingHeart } from "react-icons/fa";
  import { VscSend } from "react-icons/vsc";
  import { IoTriangleSharp } from "react-icons/io5";
  import { PiHeadCircuitThin } from "react-icons/pi";
  import { GiFruitBowl } from "react-icons/gi";
  import { IoIosBody } from "react-icons/io";
  export const commandIcon = <Command size={14} />;
  export const github = <Github size={20} />;
  export const searchIcon = <Search />;
  export const drizzleIcon = <CloudDrizzle size={25} />;
  export const rain = <CloudRain size={30} />;
  export const ThunderStrom = <CloudLightning size={30} />
 export const Atmosphere =<TornadoIcon size={30}/>
  export const snow = <Snowflake size={30} />;
  export const clearSky = <CloudSun size={30} />;
  export const cloudy = <Cloudy size={30} />;
  export const navigation = <Navigation size={15} />;
  export const thermo = <ThermometerSun size={15} />;
  export const sunsetIcon = <Sunset size={15} />;
  export const sunriseIcon = <Sunrise size={15} />;
  export const wind = <Wind size={15} />;
  export const gauge = <Gauge size={15} />;
  export const droplets = <Droplets size={15} />;
  export const thermometer = <Thermometer size={15} />;
  export const eye = <Eye size={15} />;
  export const people = <UsersRound size={15} />;
  export const calender = <CalendarDays size={15} />;
  export const sun = <SunDim size={30}  className="  dark:text-yellow-200 text-orange-500 fill-orange-500"/>;
  export const sunIcon =<SunDim size={30}/>
  export const moon =<Moon size={25}  className=" fill-black"/>
  

    //  Goggle Gemini Icon
export const FruitIcon = <GiFruitBowl/>
export const HeartIcon =< FaHandHoldingHeart/>
export const HeadIcon =<PiHeadCircuitThin />
export const ImgPlusIcon=<ImagePlusIcon/>
export const ImgIcon=<LiaImage/>
export const HistoryIcon=<History/>
export const MenuIcon=<AlignJustifyIcon/>
export const MessageIcon=<MessageSquare/>
export const MicIcon=<Mic/>
export const PlusIcon=<LiaPlusSolid size={40} />
export const QuestionIcon=<LiaQuestionCircle size={30} className=" relative  right-1"/>
export const SendIcon=<VscSend size={25}/>
export const SettingIcon=<Settings/>
export const VercelIcon=<IoTriangleSharp/>
export const BodyIcon=< IoIosBody />
export const StopIcon=<MdOutlineStopCircle/>
