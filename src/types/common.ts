import { USER_ROLE } from "@/constants/role";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export type TMeta = {
    page: number;
    limit: number;
    total: number;
};

export type UserRole = keyof typeof USER_ROLE;

export type DrawerItems = {
    title: string;
    path: string;
    parentPath?: string;
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
        muiName: string;
    };
    children?: DrawerItems[];
};

export type ResponseSuccessType = {
    data: any;
    meta?: TMeta;
};

export type ResponseErrorType = {
    statusCode: number;
    message: string;
    errorMessages: string;
};
