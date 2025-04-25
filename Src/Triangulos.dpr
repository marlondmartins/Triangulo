program Triangulos;

uses
  Vcl.Forms,
  MainForm in 'MainForm.pas' {frmMain},
  TipoTriangulo in 'TipoTriangulo.pas',
  TrianguloFactory in 'TrianguloFactory.pas';

{$R *.res}

begin
  Application.Initialize;
  Application.MainFormOnTaskbar := True;
  Application.CreateForm(TfrmMain, frmMain);
  Application.Run;
end.
