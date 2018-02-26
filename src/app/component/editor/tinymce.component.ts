import {
    Component,
    OnDestroy,
    AfterViewInit,
    EventEmitter,
    Input,
    Output,
    OnInit
} from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../../environments/environment';
@Component({
    selector: 'editor-TinyMce',
    template: `
      <textarea style="max-width:1100px !important;" id="{{elementId}}">{{initContent}}</textarea>
    `
})

export class TinyMceComponent {
    @Input() elementId: string = "my-editor";
    @Input() height: number = 600;
    @Input() content: string = "";

    @Input() initContent: string;

    @Output() onEditorKeyup = new EventEmitter<any>();

    editor: any;

    constructor(private http:Http){

    }

    ngAfterViewInit() {
        this.initEditor();
    }

    ngOnDestroy() {
        tinymce.remove(this.editor);
    }

    initEditor() {        
        tinymce.init({
            selector: `#${this.elementId}`,
            height: this.height,
            language: 'zh_CN',
            valid_elements : "*[*]",
            plugins: ['link', 'paste', 'table', 'image',"code fullscreen"],
            toolbar: `insertfile undo redo 
                | styleselect | bold italic | link image jbimages | code fullscreen | fontselect | fontsizeselect | backcolor`,
            skin_url: '/assets/skins/lightgray',
            images_upload_url: `${environment.dataServer}/upload`,
            images_upload_credentials: true,
            width:1100,
            setup: editor => {
                this.editor = editor;
                editor.on('keyup change', (e: any) => {
                    this.content = editor.getContent();
                    this.onEditorKeyup.emit(this.content);
                });
                editor.on('KeyDown', (e: any) => {
                    //删除图片
                    if ((e.keyCode == 8 || e.keyCode == 46) && editor.selection) {
                        var selectedNode = editor.selection.getNode();
                        if (selectedNode && selectedNode.nodeName == 'IMG') {
                            var list = selectedNode.src.split("/");
                            var fileName=list[list.length-1];
                            var url=`${environment.dataServer}/delimg/${fileName}`;
                            this.http.post(url, null).subscribe(data=>{                                
                            })
                        }
                    }
                });
                editor.on('init', () => {
                    this.initContent && this.editor.setContent(this.initContent, { format: 'raw' });
                });
            },
        });
    }
}
