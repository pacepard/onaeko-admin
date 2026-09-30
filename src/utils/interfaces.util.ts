import type { JSX, ReactNode } from 'react';

import type { FilterType, FormatDateType, QueryOrderType, RefineType, ResourceType } from './types.util';


/* Lightweight stubs for legacy learn/accounts shared types */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Industry = any;
type Career = any;
type Field = any;
type Skill = any;
type Topic = any;
type User = any;
type Talent = any;
type Library = any;
type Module = any;
type Lesson = any;
type Group = any;
type Question = any;
type Task = any;
type Credit = any;
type IQuestionCount = any;
type ISidebarProps = any;
type ITopbar = any;
type IToastState = any;
type ISetLoading = any;
type IUnsetLoading = any;


export interface IResult {
    error: boolean;
    message: string;
    data: any;
}

export interface IGroupedResource {
    name: string;
    links: Array<IGroupedLink>;
}

export interface IGroupedLink {
    code: string;
    title: string;
    snippet: string;
    url: string;
}

export interface IPoller {
    loading: boolean;
    key: string;
    status: string;
    code: string;
}

export interface ISetCookie {
    key: string;
    payload: any;
    expireAt?: Date;
    maxAge?: number;
    path?: string;
}

export interface IGetCookie {
    key: string;
    parse?: boolean;
}

export interface IRemoveCookie {
    key: string;
    parse?: boolean;
}

export interface IStorage {
    storeAuth(token: string, id: string, userType: string, email: string): void;
    checkToken(): boolean;
    getToken(): string | null;
    checkUserType(): boolean;
    getUserType(): string | null;
    checkUserID(): boolean;
    getUserID(): string;
    checkUserEmail(): boolean;
    getUserEmail(): string | null;
    getConfig(): any;
    getConfigWithBearer(): any;
    clearAuth(): void;
    keep(key: string, data: any): boolean;
    fetch(key: string): any;
    deleteItem(key: string, legacy?: boolean): void;
    trimSpace(str: string): void;
    copyCode(code: string): void;
    keepLegacy(key: string, data: any): boolean;
    fetchLegacy(key: string): any;
    deleteItemLegacy(key: string): void;
    debugAuth(): {
        hasToken: boolean;
        tokenValid: boolean;
        hasUserId: boolean;
        hasUserType: boolean;
        hasUserEmail: boolean;
    };
}

export interface IDateToday {
    year: string;
    month: string;
    date: string;
    hour: string;
    minutes: string;
    seconds: string;
    ISO: string;
    dateTime: string | number;
}

export interface IAudioHelper {
    progressBar: any;
    audioPlayer: any;
    progressCont: any;
    audioDuration: number | string;
    audioCurrentTime: number | string;
    audioId: string;
    playAudio(id: string): void;
    pauseAudio(id: string): void;
    muteAudio(id: string): void;
    unmuteAudio(id: string): void;
    getSeek(id: string): void;
    getSeekBar(id: string): void;
    getAudio(id: string, index: number): void;
    updateProgress(e: any): void;
    setProgress(e: any): void;
    initProgress(audioId: string): void;
    getDuration(meta: any): string | number;
    convertDuration(tm: any): string | number;
    convertTime(tm: any): string | number;
    formatTime(tm: any): { hours: number; minutes: number; seconds: number };
}

export interface IVideoHelper {
    duration: string | number;
    playVideo(id: string): void;
    pauseVideo(id: string): void;
    muteVideo(id: string): void;
    unmuteVideo(id: string): void;
    changeView(id: string): void;
    seekVideo(id: string, barId: string, timeId: string): void;
    timeUpdate(id: string, barId: string, timeId: string): void;
    getDuration(id: string, timeId: string): string;
    setVolume(id: string, rid: string): void;
    seekProgress(id: string, barId: string, seekId: string): void;
    convertTime(tm: any): string;
    formatTime(tm: any): { hours: number; minutes: number; seconds: number };
}

export interface IVideoControls {
    videoId: string;
    volumeId: string;
    timeId: string;
    barId: string;
    seekId: string;
    play: boolean;
    expand: boolean;
    playPause(e: any, id: string): void;
    expandView(e: any): void;
}

export interface IOverControls {
    videoId: string;
    play: boolean;
    plaux: boolean;
    type: string;
    audioName: string;
    index: number;
    playPause(e: any, id: string): void;
    playAudio(e: any, id: string, index: number): void;
}

export interface IAudioControls {
    name: string;
    play: boolean;
    muted: boolean;
    source: string;
    index: number;
    expand: boolean;
    playPause(e: any, id: string, index: number): void;
    muteToggle(e: any, id: string): void;
    expandView(e: any): void;
}

export interface IState {
    code: string;
    name: string;
    subdivision: string;
}

export interface ITimezone {
    name: string;
    label: string;
    displayName: string;
    countries: Array<string>;
    utcOffset: string;
    utcOffsetStr: string;
    dstOffset: string;
    dstOffsetStr: string;
    aliasOf: string;
}

export interface IUserCountry {
    name: string;
    code2: string;
    code3: string;
    capital: string;
    region: string;
    currencyCode: string;
    phoneCode: string;
    timezones: Array<ITimezone>;
}

export interface ICountry {
    name: string;
    code2: string;
    code3: string;
    capital: string;
    region: string;
    subregion: string;
    states: Array<IState>;
    slug: string;
    timezones: Array<ITimezone>;
    flag: string;
    base64: string;
    currencyCode: string;
    currencyImage: string;
    phoneCode: string;
}

export interface IHelper {
    init(type: string): void;
    scrollTo(id: string): void;
    scrollToTop(): void;
    addClass(id: string, cn: string): void;
    removeClass(id: string, cn: string): void;
    splitQueries(query: any, key: string): any;
    navOnScroll(data: { id: string; cn: string; limit?: number }): void;
    decodeBase64(data: string): { width: string; height: string; image: any };
    isEmpty(data: any, type: 'object' | 'array'): boolean;
    capitalize(val: string): string;
    sort(data: Array<any>): Array<any>;
    days(): Array<{ id: number; name: string; label: string }>;
    months(): Array<{ id: number; name: string; label: string }>;
    random(size: number, isAlpha?: boolean): string;
    formatDate(date: any, type: FormatDateType): string;
    equalLength(id: string, childId: string, len?: number): void;
    setWidth(id: string, val: number): void;
    setHeight(id: string, val: number): void;
    isNAN(val: any): boolean;
    reposition(data: Array<any>, from: number, to: number): Array<any>;
    prioritize?: (...args: any[]) => any;
    splitByComma(data: string): Array<string>;
    dateToday(date: string | Date): IDateToday;
    roundFloat(val: number): number;
    addElipsis(val: string, size: number): string;
    formatPhone(val: string, code: string): string;
    leadingZero(val: number): string;
    encodeCardNumber(num: string): string;
    monthsOfYear(val: string | number): string;
    readCountries(): Array<any>;
    listCountries(): Array<{ code: string; name: string; phone: string }>;
    sortData(data: Array<any>, filter: string): Array<any>;
    attachPhoneCode(code: string, phone: string, include: boolean): string;
    capitalizeWord(value: string): string;
    shrinkWordInString(value: string, ret: number): string;
    truncateText(text: string, max: number): string;
    objectToArray(data: Object | any): Array<any>;
    displayBalance(value: number): string;
    parseInputNumber(value: string, type: 'number' | 'decimal'): number;
    toDecimal(value: number, places: number): number;
    formatCurrency(currency: string): string;
    currentDate(): Date;
    getCurrentPage(data: IPagination): number;
    getInitials(value: string): string;
    hyphenate(action: 'add' | 'remove', val: string): string;
    daysFromDates(start: string, end: string): number;
    getCountry(code: string): ICountry | null;
    getAvatar(select: string | number): string;
    enumToArray(
        data: Object,
        type: 'all' | 'values-only' | 'keys-only',
    ): Array<any>;
    extractor(data: any): any;
    pickFrom?<T extends Record<string, any>, K extends keyof T>(
        obj: T,
        keys: K[],
    ): Pick<T, K>;
}
export interface IListQuery {
    id?: string;
    limit?: number;
    paginate?: string;
    page?: number;
    select?: string;
    order?: QueryOrderType;
    type?: string;
    admin?: boolean;
    mapped?: boolean;
    from?: string;
    to?: string;
    resource?: ResourceType;
    resourceId?: string;
    key?: string;
    payload?: any;
    cache?: boolean;
    report?: boolean;
}

export interface IMetricQuery {
    metric: 'overview' | 'resource';
    type: FilterType;
    startDate?: string;
    endDate?: string;
    resource?: FilterType;
    resourceId?: string;
    levels?: Array<string>;
    difficulties?: Array<string>;
    questionTypes?: Array<string>;
}

export interface ICoreMetrics {
    loading: boolean;
    message: string;
    type: FilterType;
    resource?: FilterType;
    question?: {
        total: number;
        enabled: number;
        disabled: number;
        resource: {
            total: number;
            enabled: number;
            disabled: number;
        };
    };
}


export interface IAPIReport {
    format: string;
    csv?: string;
    xml?: any;
    pdf?: any;
}


export interface IUserPermission {
    entity: string;
    actions: Array<string>;
}

export interface IAPIKey {
    secret: string;
    public: string;
    token: string;
    publicToken: string;
    domain: string;
    isActive: boolean;
    updatedAt: string;
}

export interface IPagination {
    next: { page: number; limit: number };
    prev: { page: number; limit: number };
}

export interface IAPIResponse {
    error: boolean;
    errors: Array<any>;
    report?: IAPIReport;
    count?: number;
    total?: number;
    pagination?: IPagination;
    data: any;
    message: string;
    token?: string;
    status: number;
}

export interface IFileUpload {
    raw: any;
    base64: string;
    parsedSize: number;
    name: string;
    size: number;
    type: string;
    dur: number;
}

export interface IGeneratedQuestion {
    body: string;
    answers: Array<IGenAnswer>;
    correct: string;
    level: string;
    score: string;
    time: string;
    difficulty: string;
    type: string;
}

export interface IGenAnswer {
    alphabet: string;
    answer: string;
}

export interface IAIQuestion {
    code: string;
    body: string;
    answers: Array<IGenAnswer>;
    correct: string;
    levels: Array<string>;
    score: string;
    time: {
        value: string;
        handle: string;
    };
    difficulties: Array<string>;
    types: Array<string>;
    fields: Array<{ name: string; id: string }>;
    skills: Array<{ name: string; id: string }>;
    topics: Array<{ name: string; id: string }>;
}

export interface IAddQuestion {
    body: string;
    answers: Array<{
        alphabet: string;
        body: string;
    }>;
    correct: string;
    levels: Array<string>;
    score: string;
    time: {
        value: string;
        handle: string;
    };
    difficulties: Array<string>;
    types: Array<string>;
    fields: Array<string>;
    skills: Array<string>;
    topics: Array<string>;
}

export interface IAnswer {
    code: string;
    alphabet: string;
    body: string;
}

export interface IQuestionOption {
    answer: IAnswer;
    type: 'option' | 'selected';
    isActive?: boolean;
    disabled?: boolean;
    onClick?(answer: IAnswer): void;
}

export interface IAppMetrics {
    loading: boolean;
    message: string;
    type: ResourceType;
    resource?: ResourceType;
    question?: {
        total: number;
        enabled: number;
        disabled: number;
        resource: {
            total: number;
            enabled: number;
            disabled: number;
        };
    };
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
    industries: Array<Industry>;
    careers: Array<Career>;
    fields: Array<Field>;
    skills: Array<Skill>;
    topics: Array<Topic>;
}

export interface IUserContext {
    users: ICollection;
    user: User;
    talents: ICollection;
    talent: Talent;
    userType: string;
    items: Array<any>;
    loading: boolean;
    loader: boolean;
    sidebar: ISidebarProps;
    topbar: ITopbar;
    toast: IToastState;
    setToast(data: IToastState): void;
    clearToast(): void;
    setSidebar(data: ISidebarProps): void;
    setTopbar(data: ITopbar): void;
    currentSidebar(collapse: boolean): ISidebarProps | null;
    setUserType(type: string): void;
    setCollection(type: string, data: ICollection): void;
    setResource(type: string, data: any): void;
    setLoading(data: ISetLoading): void;
    unsetLoading(data: IUnsetLoading): void;
}

export interface IAppContext {
    poller: IPoller;
    industries: ICollection;
    industry: Industry;
    careers: ICollection;
    career: Career;
    libraries: ICollection;
    library: Library;
    modules: ICollection;
    moudle: Module;
    lessons: ICollection;
    lesson: Lesson;
    groups: ICollection;
    group: Group;
    fields: ICollection;
    field: Field;
    skills: ICollection;
    skill: Skill;
    questions: ICollection;
    question: Question;
    tasks: ICollection;
    task: Task;
    comments: ICollection;
    comment: Comment;
    credits: ICollection;
    credit: Credit;
    questionCount: Array<IQuestionCount>;
    aiQuestions: Array<IAIQuestion>;
    topics: ICollection;
    topic: Topic;
    search: ICollection;
    metrics: IAppMetrics;
    items: Array<any>;
    item: any;
    core: ICoreResource;
    message: string;
    loading: boolean;
    loader: boolean;
    clearResource(data: IClearResource): void;
    setCollection(type: string, data: ICollection): void;
    setResource(type: string, data: any): void;
    setLoading(data: ISetLoading): void;
    unsetLoading(data: IUnsetLoading): void;
}

export interface ILocation {
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
}

export interface Upload {
    fileName: string;
    s3Key: string;
    url?: string;
}

export interface IRegisterFormErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
}

export interface ILoginrFormErrors {
    email?: string;
    password?: string;
}

export interface IOtpFormErrors {
    otp?: string;
}

export interface IForgotPwdFormErrors {
    email?: string;
    otp?: string;
}
export interface IResetPwdFormErrors {
    password?: string;
    confirmPassword?: string;
}

export interface IChangePwdFormErrors {
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
}

export interface ICopyright {
    year?: number;
    company?: string;
    className?: string;
}

export interface IUserLocation {
    id?: string;
    ip: string;
    city: string;
    region: string;
    region_code: string;
    country: string;
    country_name: string;
    country_code: string;
    country_code_iso3: string;
    country_capital: string;
    country_tld: string;
    continent_code: string;
    in_eu: boolean;
    postal: string | null;
    latitude: number;
    longitude: number;
    timezone: string;
    utc_offset: string;
    country_calling_code: string;
    currency: string;
    currency_name: string;
    languages: string;
    country_area: number;
    country_population: number;
    asn: string;
    org: string;
    description?: string;
    className?: string;
    street: string;
}

export interface ILegalNameInput {
    id?: string;
    firstName?: string;
    lastName?: string;
    description?: string;
    label?: string;
    className?: string;
}

export interface IDOBPicker {
    label?: string;
    id?: string;
    className?: string;
    /** Initial value as `YYYY-MM-DD` (from account API). */
    initialIsoDate?: string | null;
    /** Fires when year, month, and day are all selected (`YYYY-MM-DD`). */
    onDateIsoChange?: (isoDate: string | null) => void;
}

export interface IOnboarding {
    step?: string;
}

export interface IAddressInput {
    id?: string;
    street: string;
    className?: string;
    description?: string;
    onChange?: (value: string) => void;
    readOnly?: boolean;
    placeholder?: string;
}

export interface ICityInput {
    city: string;
    className?: string;
    description?: string;
    onChange?: (value: string) => void;
    readOnly?: boolean;
}

export interface PhoneInputProps {
    phoneNumber: string;
    country: ICountry | undefined;
    onPhoneChange: (value: string) => void;
    onCountryChange: (country: ICountry) => void;
    disabled?: boolean;
    className?: string;
}

export interface IRoute {
    name: string;
    path?: string;
    index?: boolean;
    element?: ReactNode | JSX.Element;
    redirect?: string;
    children?: Array<IRoute>;
    errorElement?: ReactNode | JSX.Element;
}
