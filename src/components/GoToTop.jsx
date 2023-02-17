import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function GoToTop() {
const routePath = useLocation();
const onTop = () => {
	document.querySelector('body').scrollIntoView({ 
  block: "start"
})
}
useEffect(() => {
	onTop()
}, [routePath]);

return null;
}
