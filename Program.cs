using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// SERVE I FILE STATICI DALLA ROOT DEL PROGETTO
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(app.Environment.ContentRootPath, "."))
});

// Reindirizza la root verso index.html
app.MapGet("/", async context =>
{
    context.Response.Redirect("/index.html");
});

app.Run();