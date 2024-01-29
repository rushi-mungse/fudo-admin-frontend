import { Drawer } from "antd";

interface PropType {
    open: boolean;
    closeDrawer: () => void;
    title: string;
    children: string | JSX.Element | JSX.Element[];
}

const Modal = ({ open, closeDrawer, title, children }: PropType) => {
    return (
        <Drawer
            title={title}
            placement="right"
            width={700}
            onClose={closeDrawer}
            open={open}
        >
            {children}
        </Drawer>
    );
};

export default Modal;
