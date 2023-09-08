gsap.registerPlugin(ScrollTrigger)

function skewcircle(){
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;
    
    window.addEventListener("mousemove", (e)=>{
        var xdiff = e.clientX - xprev;
        var ydiff = e.clientY - yprev;
        if(xdiff < 0)
        {
            xdiff = -1 * xdiff;
            xscale = gsap.utils.clamp(.8,1.2, xdiff);
        }
        else
        {
            xscale = gsap.utils.clamp(.8,1.2, xdiff);
        }
        if(ydiff < 0)
        {
            ydiff = -1 * ydiff;
            yscale = gsap.utils.clamp(.8,1.2, ydiff);
        }
        else
        {
            yscale = gsap.utils.clamp(.8,1.2, ydiff);
        }

        xprev = e.clientX;
        yprev = e.clientY;

        circleMouseFollower(xscale, yscale);
    })
}

function circleMouseFollower(xscale, yscale){
    window.addEventListener("mousemove", (e) =>{
        document.querySelector("#minCircle").style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(${xscale}, ${yscale})`;
    })
}

document.querySelectorAll(".elements").forEach((elem)=>{
    var rotate = 0;
    var diff = 0;

    elem.addEventListener("mouseleave",(e)=>{
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
        })
    });

    elem.addEventListener("mousemove",(e)=>{

        var pos = e.clientY - elem.getBoundingClientRect().top;
        diff = e.clientX - rotate;
        rotate = e.clientX;
        var value = gsap.utils.clamp(-20,20,diff*0.5);
        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: pos,
            left: e.clientX,
            rotate: value,
        })
    });
});

skewcircle();
circleMouseFollower();