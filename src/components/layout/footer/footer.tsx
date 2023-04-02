import Widgets from "./widgets";
import Copyright from "./copyright";
import { footer } from "./data";
const { widgets, payment } = footer;

const Footer: React.FC = () => (
  <footer className="border-b-4 border-heading bg-black   pt-2.5 lg:pt-0 2xl:pt-2" style={{transform:"translateY(-18px)"}}>
    <Widgets widgets={widgets} />
    <Copyright payment={payment} />
  </footer>
);

export default Footer;
