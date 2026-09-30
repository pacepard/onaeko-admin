import type { IAPIReport, IPagination } from '@/utils/interfaces.util';
import type { RefineType } from '@/utils/types.util';

export interface ISetLoading {
    option: 'default' | 'resource' | 'loader';
    type?: string;
}

export interface IUnsetLoading {
    option: 'default' | 'resource' | 'loader';
    type?: string;
    message?: string;
}

export interface IClearResource {
    type: string;
    resource: 'multiple' | 'single';
}

export interface ICollection {
    data: Array<any>;
    report?: IAPIReport;
    count: number;
    total: number;
    pagination: IPagination;
    loading: boolean;
    refineType?: RefineType;
    message?: string;
    payload?: any;
}

export interface ICoreResource {
    forms: Array<any>;
    blocks: Array<any>;
    questions: Array<any>;
    responses: Array<any>;
}

export interface IHackDomain {
    hackathons: Array<any>;
    entries: Array<any>;
    submissions: Array<any>;
    squad: Array<any>;
}

export interface IProjectDomain {
    projects: Array<any>;
    Teams: Array<any>;
    tasks: Array<any>;
}

export interface IRouteItem {
    name: string;
    path?: string;
    title?: string;
    subroutes?: Array<IRouteItem>;
    inroutes?: Array<IRouteItem>;
}

export interface ISidebarProps {
    collapsed: boolean;
    route: IRouteItem;
    isOpen: boolean;
    subroutes: Array<IRouteItem>;
    inroutes: Array<IRouteItem>;
}

export interface IToastState {
    type: 'success' | 'error' | 'info' | 'warning' | string;
    show: boolean;
    message: string;
    title: string;
    position?: string;
    close?: () => void;
}

export type IToast = IToastState;

export interface IUserContext {
    users: ICollection;
    user: any;
    userType: string;
    businessType: string;
    talent?: any;
    business?: any;
    admin?: any;
    hackathon?: any;
    entry?: any;
    submission?: any;
    squad?: any;
    project?: any;
    team?: any;
    task?: any;
    subscription?: any;
    plan?: any;
    loading: boolean;
    sidebar: ISidebarProps;
    toast: IToastState;
    setToast(data: IToastState): void;
    clearToast(): void;
    setSidebar(data: ISidebarProps): void;
    currentSidebar(collapse: boolean): ISidebarProps | null;
    setUserType(type: string): void;
    setBusinessType(type: string): void;
    setCollection(type: string, data: ICollection): void;
    setResource(type: string, data: any): void;
    setLoading(data: ISetLoading): void;
    unsetLoading(data: IUnsetLoading): void;
    [key: string]: any;
}

export interface IAppContext {
    talent?: any;
    business?: any;
    admin?: any;
    hackathon?: any;
    entry?: any;
    submission?: any;
    squad?: any;
    project?: any;
    team?: any;
    task?: any;
    plans?: ICollection;
    plan?: any;
    transactions?: ICollection;
    transaction?: any;
    search?: ICollection;
    items?: Array<any>;
    workspaces?: ICollection;
    workspace?: any;
    core?: ICoreResource;
    hackCore?: IHackDomain;
    projectCore?: IProjectDomain;
    message?: string;
    loading?: boolean;
    loader?: boolean;
    clearResource?(data: IClearResource): void;
    setCollection?(type: string, data: ICollection): void;
    setResource?(type: string, data: any): void;
    setLoading?(data: ISetLoading): void;
    unsetLoading?(data: IUnsetLoading): void;
    [key: string]: any;
}
