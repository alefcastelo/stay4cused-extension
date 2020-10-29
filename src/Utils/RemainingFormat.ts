class RemainingFormat {

    static getSeconds = (remaining: number): string => RemainingFormat.pad2((remaining % 60));

    static getMinutes = (remaining: number): string  => RemainingFormat.pad2(Math.floor(remaining / 60));

    static getTime = (remaining: number): string  => `${RemainingFormat.getMinutes(remaining)}:${RemainingFormat.getSeconds(remaining)}`;

    static pad2 = (value: number): string => (value < 10 ? '0' : '') + value
}

export default RemainingFormat;