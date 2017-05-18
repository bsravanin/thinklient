import {testLog, hideAllPosts} from './crud-filter/crud-filter'

class Startup {
    public static main(): number {
        console.info("Think...")
        testLog()
        hideAllPosts()
        return 0;
    }
}

Startup.main()