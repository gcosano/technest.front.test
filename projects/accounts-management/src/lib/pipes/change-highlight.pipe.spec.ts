import { ElementRef } from '@angular/core';
import { ChangeHighlightPipe } from './change-highlight.pipe';


describe('ChangeHighlightPipe', () => {

    const ref: ElementRef = new ElementRef(document.createElement('span'));

    // This pipe is a pure, stateless function so no need for BeforeEach
    const pipe = new ChangeHighlightPipe(ref);

});
