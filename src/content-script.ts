import {testLog, hideAllPosts} from './crud-filter/crud-filter'
import {encourageDiscard} from './encourage-discard/encourage-discard'

class Startup {
    public static main(): number {
        console.info("Think...")
        testLog()
        hideAllPosts()
        encourageDiscard()
        return 0;
    }
}

Startup.main()